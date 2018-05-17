module.exports = {
    GET_USER: {
        SUCCESS: {
          code: 200,
          message: 'Get User success!'
        },
        FAIL: {
            AUTHOR: {
                code: 404,
                message: "Get User fail! Not Author to get user's information!"
            },
            USER_NOTFOUND: {
                code: 404,
                message: 'Get User fail! User not found!'
            },
        }
    },
    UPDATE_USER: {
        SUCCESS: {

        },
        FAIL: {
            AUTHOR: {
                code: 404,
                message: "Update User fail! Not Author to update user's information!"
            },
            USER_EXIST: {
                code: 404,
                message: 'Update User fail! User EXISTED!'
            }
        }
    },
    DELETE_USER: {
        AUTHOR: {
            code: 404,
            message: "Delete User fail! Not Author to delete user's information!"
        },
        SUCCESS: {
            code: 200,
            message: 'Delete User success!'
        },
        FAIL: {
            USER_NOTFOUND: {
                code: 404,
                message: 'Delete User fail! User not found!'
            }
        }
    }
}
