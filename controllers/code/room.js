module.exports = {
	checkUserHotelAuth: {
		FAIL: {
			code: 401,
            message: 'Not Auth'
		}
	},
	createRoom: {
		SUCCESS: {
			code: 200,
            message: 'Create Room Success'
		},
		FAIL: {
			code: 402,
            message: 'Create Room Fail'
		}
	},
	getRooms: {
		SUCCESS: {
			code: 200,
            message: 'Get Rooms Success'
		},
		FAIL: {
			code: 402,
            message: 'Get Rooms Fail'
		}
	},
	getRoomById: {
		SUCCESS: {
			code: 200,
            message: 'Get Room by Id Success'
		},
		FAIL: {
			code: 403,
            message: 'Get Room by Id Fail'
		}
	},
	updateRoom: {
		SUCCESS: {
			code: 200,
            message: 'Update Room Success'
		},
		FAIL: {
			code: 404,
            message: 'Update Room Fail'
		}
	},
	deleteRoom: {
		SUCCESS: {
			code: 200,
            message: 'Delete Room Success'
		},
		FAIL: {
			code: 405,
            message: 'Delete Room Fail'
		}
	}
}