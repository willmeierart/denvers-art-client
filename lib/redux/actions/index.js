import fetch from 'node-fetch'
import { FBdataTransformer } from '../../_utils'

import {
	CHECK_IF_MOBILE,
	CHECK_IF_IE,
	CHECK_BROWSER,
	GET_VP_DIMS,
	LOCK_ORIENTATION,
	FETCH_FB_DATA,
	SET_VIEW_STATE,
	SET_ALL_MAP_MARKERS,
	SET_INTRO_SEEN,
	SET_EVENTS_STATE,
	SET_ACTIVE_MARKER,
	SET_ACTUAL_MAP_MARKERS
} from './types'

export const setIntroSeen = bool => async dispatch => {
	dispatch({
		type: SET_INTRO_SEEN,
		payload: bool
	})
}

export const checkIfMobile = () => async dispatch => {
	const bool = window !== undefined && (window.orientation !== undefined || window.innerWidth < 1000)
	dispatch({
		type: CHECK_IF_MOBILE,
		payload: bool
	})
}

export const checkIfIE = () => async dispatch => {
	const check = () => {
		if (typeof window !== 'undefined') {
			return window.navigator.userAgent.indexOf('indows') !== -1
		} else {
			setTimeout(() => {
				check()
			}, 200)
		}
	}
	dispatch({
		type: CHECK_IF_IE,
		payload: check()
	})
}

export const checkBrowser = () => async dispatch => {
	let browser = 'unknown'
	if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
		browser = 'opera'
	} else if (navigator.userAgent.indexOf('chrome') !== -1) {
		browser = 'chrome'
	} else if (navigator.userAgent.indexOf('Safari') !== -1) {
		browser = 'safari'
	} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
		browser = 'firefox'
	} else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
		browser = 'ie'
	}
	dispatch({
		type: CHECK_BROWSER,
		payload: browser
	})
}

export const getVPDims = () => async dispatch => {
	const getDims = () => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', () => {
				this.getDims()
			})
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		} else {
			setTimeout(() => {
				getDims()
			}, 200)
		}
	}
	dispatch({
		type: GET_VP_DIMS,
		payload: getDims()
	})
}

export const lockOrientation = () => async dispatch => {
	// experimental, will not work yet in anything except firefox mobile
	const lockScreen = () => {
		if (typeof window !== 'undefined') {
			const { screen } = window
			screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation
			if (typeof screen.lockOrientationUniversal !== 'undefined') {
				return screen.lockOrientationUniversal('portrait-primary')
			} else {
				console.log('"screen.lockOrientation" not supported on this device')
				return false
			}
		} else {
			setTimeout(() => {
				lockScreen()
			}, 500)
		}
	}
	dispatch({
		type: LOCK_ORIENTATION,
		payload: lockScreen()
	})
}

export const fetchFBdata = () => async dispatch => {
	const test = false
	const PROXY = test ? process.env.PROXY_TEST : process.env.PROXY
	fetch(PROXY).then(async res => {
		const data = await res.json()
		const transformedData = typeof data === 'object' ? FBdataTransformer(data) : null
		dispatch({
			type: FETCH_FB_DATA,
			payload: transformedData
		})
	})
}

export const setAllMapMarkers = allLocs => async dispatch => {
	dispatch({
		type: SET_ALL_MAP_MARKERS,
		payload: allLocs
	})
}
export const setActualMapMarkers = markers => async dispatch => {
	dispatch({
		type: SET_ACTUAL_MAP_MARKERS,
		payload: markers
	})
}

export const setActiveMarker = markerID => async dispatch => {
	dispatch({
		type: SET_ACTIVE_MARKER,
		payload: markerID
	})
}

export const setViewState = viewState => async dispatch => {
	dispatch({
		type: SET_VIEW_STATE,
		payload: viewState
	})
}

export const setEventsState = eventsState => async dispatch => {
	dispatch({
		type: SET_EVENTS_STATE,
		payload: eventsState
	})
}
