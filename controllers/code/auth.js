module.exports = {
    UN_AUTH: {
        code: 100,
        message: 'unAuthentication!!!'
    },
    LOG_IN: {
        SUCCESS: {
            code: 200,
            message: 'Log In Success'
        },
        FAIL: {
            LOGIN_EMPTY:{
                code: 404,
                message: 'Username and password does not exist'
            },
            LOGIN_FAIL:{
                code: 404,
                message: 'Username or password fail'
            },
            SEND_MAIL_SUCCESS:{
                code: 201,
                message: 'Your Account is not active! Please check your email to active yours'
            },
            SEND_MAIL: {
                code: 404,
                message: 'Send Mail to active Error! Check your connection'
            },
        }
    },
    LOG_OUT: {
        SUCCESS: {
            code: 200,
            message: 'Log Out Success'
        },
        FAIL: {
            NOT_AUTHOR:{
                code: 404,
                message: 'Log Out Fail! Not Authorize'
            }
        }
    },
    SIGN_UP:{
        SUCCESS: {
            code: 200,
            message: 'Sign Up Success! Check email to active your account'
        },
        FAIL: {
            SEND_MAIL: {
                code: 404,
                message: 'Send Mail to active Error! Check your connection'
            },
            EXIST_ACCOUNT: {
                code: 404,
                message: 'Sign Up Error! Account has already existed'
            },
            EMPTY: {
                code: 404,
                message: 'Sign Up Error! Username, email and password must not be empty'
            },
            CREATE: {
              code: 404,
              message: 'Sign Up Error! Fail to create for this user'
            }

        }
    },
    ACTIVE_ACCOUNT: {
        SUCCESS: {
            code: 200,
            message: 'Active Account Success! You can login with this account'
        },
        FAIL: {
            TOKEN: {
                code: 404,
                message: 'Active Account Error! Can not verify this token'
            },
            UPDATE: {
                code: 404,
                message: 'Active Account Error! FAIL to update active User Account'
            }
        }
    }
}
