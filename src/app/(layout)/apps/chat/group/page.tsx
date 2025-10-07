'use client'

import React, { useEffect, useState } from 'react'

import BreadCrumb from '@src/components/common/BreadCrumb'
import { defaultGroupChatMessages } from '@src/data'
import { GroupChatRecord, NextPageWithLayout } from '@src/dtos'
import { AppDispatch, RootState } from '@src/slices/reducer'
import {
  deleteGroupChatRecordData,
  getGroupChatData,
  setCurrentGroupChatListRecord,
} from '@src/slices/thunk'
import AddNewGroupModal from '@src/views/Apps/chat/group/AddNewGroupModal'
import DeleteGroupModal from '@src/views/Apps/chat/group/DeleteGroupModal'
import GroupChatBoard from '@src/views/Apps/chat/group/GroupChatBoard'
import GroupChatList from '@src/views/Apps/chat/group/GroupChatList'
import GroupInfo from '@src/views/Apps/chat/group/GroupInfo'
import { useDispatch, useSelector } from 'react-redux'

const Group: NextPageWithLayout = () => {
  const { groupChatList, currentGroupChatRecord } = useSelector(
    (state: RootState) => state.GroupChat
  )
  const dispatch = useDispatch<AppDispatch>()
  const [allGroupChatRecords, setGroupChatRecords] = useState<
    GroupChatRecord[]
  >([])
  const [, setDefaultChatData] = useState<GroupChatRecord>(
    {} as GroupChatRecord
  )
  const [searchGroup, setSearchGroup] = useState<string>('')
  const [isOpenAddNewGroupModal, setIsOpenAddNewGroupModal] =
    useState<boolean>(false)
  const [, setIsAudioCallModalOpen] = useState<boolean>(false)
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] =
    useState<boolean>(false)
  const [isMobileView, setIsMobileView] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<'chatList' | 'chatBoard'>(
    'chatList'
  )

  // Handle opening the "Add New Group" modal
  const handleAddNewGroupModal = (val: boolean) => {
    setIsOpenAddNewGroupModal(val)
  }

  // Handle audio call modal opening
  const handleOpenAudioCallModal = (value: boolean) => {
    setIsAudioCallModalOpen(value)
  }

  // Handle deleting the group chat record
  const handleDeleteGroupModal = () => {
    setIsDeleteGroupModalOpen(false)
    dispatch(deleteGroupChatRecordData([currentGroupChatRecord?.id]))
  }

  // Search groups
  const handleSearchGroups = (value: string) => {
    setSearchGroup(value)
    if (value.trim() === '') {
      setGroupChatRecords(groupChatList)
    } else {
      const filterList = groupChatList.filter((item: GroupChatRecord) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
      setGroupChatRecords(filterList)
    }
  }

  // Set the current group chat
  const handleSelectChat = (chat: GroupChatRecord) => {
    dispatch(setCurrentGroupChatListRecord(chat)) // Set the current chat
    setCurrentView('chatBoard') // Switch to the chat board view on mobile
  }

  // Handle going back to the chat list (for mobile view)
  const handleBackToChatList = () => {
    setCurrentView('chatList')
  }

  // Fetch group chat data
  useEffect(() => {
    if (!groupChatList) {
      dispatch(getGroupChatData())
    } else {
      setGroupChatRecords(groupChatList)
      if (!currentGroupChatRecord && groupChatList.length > 0) {
        dispatch(setCurrentGroupChatListRecord(groupChatList[0]))
      }
    }
  }, [dispatch, groupChatList, currentGroupChatRecord])

  // Set default chat data
  useEffect(() => {
    if (defaultGroupChatMessages) {
      setDefaultChatData(defaultGroupChatMessages)
    }
  }, [])
  // Handle screen resizing to detect mobile view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobileView = window.innerWidth <= 1024
        setIsMobileView(mobileView)

        // Reset to chat list on small screens when switching from larger screens
        if (mobileView) {
          setCurrentView('chatList')
        }
      }
      // Add event listener for window resize
      window.addEventListener('resize', handleResize)
      // Initial check on component mount
      handleResize()
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <React.Fragment>
      <BreadCrumb title="Group Chat" subTitle="Chats" />
      <div className="grid grid-cols-12 gap-x-space">
        {isMobileView ? (
          currentView === 'chatList' ? (
            <GroupChatList
              groupChatList={allGroupChatRecords}
              handleSearchGroups={handleSearchGroups}
              searchGroup={searchGroup}
              currentGroupChat={currentGroupChatRecord}
              openAddNewGroupModal={() => handleAddNewGroupModal(true)}
              onSelectChat={handleSelectChat}
            />
          ) : (
            <GroupChatBoard
              handleAudioCallModal={() => handleOpenAudioCallModal(true)}
              currentGroupChat={currentGroupChatRecord}
              handleDeleteGroupModal={() => setIsDeleteGroupModalOpen(true)}
              onBack={handleBackToChatList}
            />
          )
        ) : (
          <>
            <GroupChatList
              groupChatList={allGroupChatRecords}
              handleSearchGroups={handleSearchGroups}
              searchGroup={searchGroup}
              currentGroupChat={currentGroupChatRecord}
              openAddNewGroupModal={() => handleAddNewGroupModal(true)}
              onSelectChat={handleSelectChat}
            />

            {/* Group chat board */}
            <GroupChatBoard
              handleAudioCallModal={() => handleOpenAudioCallModal(true)}
              currentGroupChat={currentGroupChatRecord}
              handleDeleteGroupModal={() => setIsDeleteGroupModalOpen(true)}
              onBack={handleBackToChatList}
            />

            {/* Group info */}
            <GroupInfo currentChat={currentGroupChatRecord} />
          </>
        )}
      </div>

      {/* Add New Group Modal */}
      {isOpenAddNewGroupModal && (
        <AddNewGroupModal
          open={isOpenAddNewGroupModal}
          closeModal={() => setIsOpenAddNewGroupModal(false)}
          groupChatList={groupChatList}
        />
      )}

      {/* Delete Group Modal */}
      {isDeleteGroupModalOpen && (
        <DeleteGroupModal
          open={isDeleteGroupModalOpen}
          closeModal={() => setIsDeleteGroupModalOpen(false)}
          deleteGroupChatRecord={handleDeleteGroupModal}
        />
      )}
    </React.Fragment>
  )
}

export default Group
