module.exports = {
    CHECKFILE:{
        FAIL:{
            UNUPLOAD:{
                code : 404,
                message: "INCORRECT FORMAT. ONLY FILE .zip!!",
            },
            UNFILE:{
                code : 404,
                message: "NO FILE!!",
            },         
            UNDOWNLOAD:{
                code: 404,
                message: "FILE DOES NOT EXIST. CAN NOT DOWNLOAD!!",
            },
            UNUPDATE:{
                code: 404,
                message: "FILE DOES NOT EXIST. CAN NOT UPDATE!!",
            },
            UNDELETE:{
                code: 404,
                message: "FILE DOES NOT EXIST. CAN NOT DELETE!!",
            }
        },
        SUCCESS:{
            UPLOADED:{
                code : 200,
                message:  "UPLOAD FILE SUCCESS!!",
            },
            DOWNLOADED:{
                code : 200,
                message: "DOWNLOAD FILE SUCCESS!!",
            },
            UPDATED:{
                code : 200,
                message:  "UPDATE FILE SUCCESS!!",
            },
            DELETED:{
                code : 200,
                message: "DELETE FILE SUCCESS!!",
            }
        }
    }
}