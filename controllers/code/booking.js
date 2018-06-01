module.exports = {
    createBooking: {
        SUCCESS: {
            code: 200,
            message: "Create Booking Success"
        },
        FAIL: {
            code: 501,
            message: "Create Booking Fail"
        },
        RoomErr: {
            code: 501,
            message: "Create Booking RoomErr Fail"
        },
        RoomNotFound: {
            code: 501,
            message: "Create Booking RoomNotFound Fail"
        }
    },  
    getBookingById:{
        SUCCESS: {
            code: 200,
            message: "Get Booking by Id Success"
        },
        FAIL: {
            code: 502,
            message: "Get Booking by Id Fail"
        }
    },
    getBookings: {
        SUCCESS: {
            code: 200,
            message: "Get Books Success"
        },
        FAIL: {
            code: 503,
            message: "Get Books Fail"
        }
    },
    updateBooking: {
        SUCCESS: {
            code: 200,
            message: "Update Book Success"
        },
        FAIL: {
            code: 504,
            message: "Update Books Fail"
        }
    }
}