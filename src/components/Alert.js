/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-16 21:35:41
 * @modify date 2020-08-16 21:35:55
 * @desc Alert Component Base
 */

import { notification } from 'antd';

const Alert = Object.assign(
    {
        success: (message = '') => notification['success']({ message: 'Success', description: message }),
        error: (message = '') => notification['error']({ message: 'Error', description: message, duration: null })
    }
)

export default Alert;