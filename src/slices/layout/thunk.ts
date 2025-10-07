import {
  DARK_MODE_CLASS,
  DATA_COLORS,
  LAYOUT_CONTENT_WIDTH,
  LAYOUT_DIRECTION,
  LAYOUT_LANGUAGES,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  MODERN_NAVIGATION,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
} from '@src/components/constants/layout'

import { AppDispatch, RootState } from '../reducer'
import {
  changeLayoutAction,
  changeLayoutDarkModeClass,
  changeLayoutDataColorAction,
  changeLayoutDirectionAction,
  changeLayoutLanguageAction,
  changeLayoutModalNavigationAction,
  changeLayoutModeAction,
  changeLayoutSidebarAction,
  changeLayoutSidebarColorAction,
  changeLayoutWidthAction,
} from './reducer'
import {
  appendDarkModeClass,
  changeHTMLAttribute,
  getPreviousStorageData,
  removeAttribute,
  setNewThemeData,
} from './utils'

/**
 * Changes the layout type
 * @param {*} param0
 */

export const changeLayout =
  (layout: LAYOUT_TYPES) => async (dispatch: AppDispatch) => {
    try {
      // Set the HTML 'data-layout' attribute using the provided helper
      changeHTMLAttribute('data-layout', layout)

      // If the layout is 'modern', retrieve the previous theme data from localStorage
      if (layout === LAYOUT_TYPES.MODERN) {
        const previousNavType =
          getPreviousStorageData('data-theme-nav-type') || 'default'

        // Set the 'data-nav-type' attribute with the previous value
        changeHTMLAttribute('data-nav-type', previousNavType)

        // Save the layout type to localStorage
        setNewThemeData('data-theme-nav-type', previousNavType)
      } else {
        // If it's not 'modern', remove the 'data-nav-type' attribute
        changeHTMLAttribute('data-nav-type', '')
      }

      if (layout !== LAYOUT_TYPES.HORIZONTAL) {
        const previousNavType =
          getPreviousStorageData('data-sidebar-size') || 'default'
        const previousSidebarColor =
          getPreviousStorageData('data-sidebar-colors') || 'dark'

        changeHTMLAttribute('data-sidebar', previousNavType)
        setNewThemeData('data-sidebar-size', previousNavType)
        changeHTMLAttribute('data-sidebar-colors', previousSidebarColor)
        changeHTMLAttribute('data-sidebar-colors', previousSidebarColor)
      } else {
        changeHTMLAttribute('data-sidebar', '')
        changeHTMLAttribute('data-sidebar-colors', '')
        changeHTMLAttribute('data-sidebar-colors', '')
      }

      // Dispatch the action to update the layout state
      setNewThemeData('data-layout-type', layout)
      dispatch(changeLayoutAction(layout))
    } catch (error) {
      console.error('Error changing layout', error)
    }
  }

/**
 * Changes the Content width
 * @param {*} param0
 */
export const changeLayoutContentWidth =
  (contectWidth: LAYOUT_CONTENT_WIDTH) => async (dispatch: AppDispatch) => {
    try {
      changeHTMLAttribute('data-content-width', contectWidth)
      setNewThemeData('data-layout-content-width', contectWidth)
      dispatch(changeLayoutWidthAction(contectWidth))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLayoutMode =
  (layoutMode: LAYOUT_MODE_TYPES) => async (dispatch: AppDispatch) => {
    try {
      changeHTMLAttribute('data-mode', layoutMode)
      setNewThemeData('data-layout-mode', layoutMode)
      dispatch(changeLayoutModeAction(layoutMode))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Changes the sidebar size
 * @param {*} param0
 */
export const changeSidebarSize =
  (sidebarSize: SIDEBAR_SIZE) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState()
      if (state.Layout.layoutType !== LAYOUT_TYPES.HORIZONTAL) {
        switch (sidebarSize) {
          case 'default':
            changeHTMLAttribute('data-sidebar', 'default')
            break
          case 'medium':
            changeHTMLAttribute('data-sidebar', 'medium')
            break
          case 'small':
            changeHTMLAttribute('data-sidebar', 'small')
            break
          default:
            changeHTMLAttribute('data-sidebar', 'default')
        }
        setNewThemeData('data-sidebar-size', sidebarSize)
      }
      dispatch(changeLayoutSidebarAction(sidebarSize))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Changes the Sidebar Color
 * @param {*} param0
 */
export const changeSidebarColor =
  (sidebarColor: SIDEBAR_COLOR) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState()
    try {
      if (state.Layout.layoutType === LAYOUT_TYPES.HORIZONTAL) {
        removeAttribute('data-sidebar-colors')
        removeAttribute('data-sidebar-colors')
      } else {
        changeHTMLAttribute('data-sidebar-colors', sidebarColor)
        setNewThemeData('data-sidebar-colors', sidebarColor)
        dispatch(changeLayoutSidebarColorAction(sidebarColor))
      }
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Changes the layout direction
 * @param {*} param0
 */
export const changeDirection =
  (direction: LAYOUT_DIRECTION) => async (dispatch: AppDispatch) => {
    try {
      changeHTMLAttribute('dir', direction)
      setNewThemeData('data-layout-direction', direction)
      dispatch(changeLayoutDirectionAction(direction))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Changes the data color
 * @param {*} param0
 */
export const changeDataColor =
  (datacolor: DATA_COLORS) => async (dispatch: AppDispatch) => {
    try {
      changeHTMLAttribute('data-colors', datacolor)
      setNewThemeData('data-theme-color', datacolor)
      dispatch(changeLayoutDataColorAction(datacolor))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Change the layout language
 * @param {*} param0
 */

export const changeModernNavigation =
  (Navigation: MODERN_NAVIGATION) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const state = getState()
      if (state.Layout.layoutType === LAYOUT_TYPES.MODERN) {
        changeHTMLAttribute('data-nav-type', Navigation)
        setNewThemeData('data-theme-nav-type', Navigation)
      }
      dispatch(changeLayoutModalNavigationAction(Navigation))
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Change the layout language
 * @param {*} param0
 */

export const changeDarkModeClass =
  (darkModeClass: DARK_MODE_CLASS) => async (dispatch: AppDispatch) => {
    try {
      // Example of an existing class, "scroll-smooth group"
      const updatedClass = appendDarkModeClass(
        'scroll-smooth group',
        darkModeClass
      )
      changeHTMLAttribute('class', updatedClass)
      setNewThemeData('data-theme-dark-class', darkModeClass) // Passing the dark mode class
      dispatch(changeLayoutDarkModeClass(darkModeClass)) // Dispatch action with the new dark mode class
    } catch (error) {
      console.log(error)
    }
  }

/**
 * Change the layout language
 * @param {*} param0
 */
export const changeLayoutLanguage =
  (language: LAYOUT_LANGUAGES) => async (dispatch: AppDispatch) => {
    try {
      changeHTMLAttribute('lang', language)
      setNewThemeData('data-layout-language', language)
      // i18n.changeLanguage(language);
      dispatch(changeLayoutLanguageAction(language))
    } catch (error) {
      console.log(error)
    }
  }
