'use client';
import { DOMAIN } from '../utils/constants';

import axios from 'axios';
export const handlingGettingUser = async () => {
  try {
    let token = localStorage.getItem('token');
    console.log('token', token);

    if (!token || typeof token !== 'string') {
      console.log('No token found in cookies');
      return;
    }

    const response = await axios.get(`${DOMAIN}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log('response:', response);
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};
// export const handlingGettingBrands = async () => {
//   try {
//     // let token = Cookies.get("Token");
//     const response = await axios.get(
//       `${DOMAIN}/api/Brand`,
//       {},
//       {
//         headers: {
//           //   Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       }
//     );
//     if (response.status === 200) {
//       return response.data.brands;
//     }
//   } catch (error) {
//     console.log("error getting brands", error);
//     return null;
//   }
// };
export default { handlingGettingUser };
