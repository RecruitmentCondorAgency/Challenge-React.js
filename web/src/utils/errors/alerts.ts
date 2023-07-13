import { toast } from "react-toastify"

const generateError = (err:string) => toast.error(err, {
    position:"bottom-right",
})

const generateSuccess = (msg:string) => toast.success(msg, {
    position:"bottom-right",
    
})


export {generateError, generateSuccess}