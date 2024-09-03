import { createContext, useContext, useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
// CONTEXT
import axios from 'axios';
export const AuthContext= createContext();


// PROVIDER BELOW
// responsible for providing data(context) to its descendents

export const AuthProvider= ({children})=>{

const[tokenval,setTokenval]= useState(localStorage.getItem('token'))
const [user,setUser]=useState("");
const [services,setServices]=useState([]);
const [adminUserData,setAdminUserData]=useState("");
const [adminContactData,setAdminContactData]=useState("");
const [isLoading,setIsLoading]=useState(true);
const [isAdminn,setIsAdminn]= useState(false);
const [balance, setBalance] = useState(0);
const [accountId, setAccountId] = useState(0);


// const updateUserAdminStatus = (newStatus) => {
//     setIsAdminn(newStatus);
//     setIsLoading(true);
//   };




     


    const storeTokenInLocal = (authToken)=>{
        setTokenval(authToken);
         return localStorage.setItem('token',authToken)
    }

    let isLoggedIn= !!tokenval;//will return true if anything is contained in token
  
    //  LOGOUT  Problem

    const logoutFunc = ()=>{
        setTokenval("");
        setUser("")
        // setIsLoading(true);
        return localStorage.removeItem('token');

    }

    // const loginFunc = ()=>{
    //     if(user.isAdmin){updateUserAdminStatus(true)};
    // }


    // aUTHENTICATION jwt Or  to GET CURRENTLY logged in uSER DATA
// const userDataCollection = async() =>{
//     try {
//         // setIsLoading(true);
//         const response = await fetch('https://graytm-wallet.onrender.com/graytm/user/',{
//             method:"GET",
//             headers:{
//                 Authorization:`Bearer ${tokenval}`//as from postman and token is already fetched above from the user logged in
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();//all the userdata now comes inside data
//             // //console.log("user data",data.userData)//.userData is used because in the erver side in auth controller user logic we have defined uusr data using userData and this fetch url in going to that part
//             // //console.log("user data",data.userData.isAdmin)
//             // setUser(data.userData);//will update all the details of user to setUser and user will now have all data
//             // setIsLoading(false);
           
//             // setIsAdminn(data.userData.isAdmin);
//         }
//         else{
//             // setIsLoading(false);
//             //console.log("Loading State Error");
//         }
//     } catch (error) {
//         //console.log("Error Fetching User Data",error);
//     }
// }


// const getServices = async ()=>{
 
// try {

//     const response = await fetch('https://graytm-wallet.onrender.com/auth/service',{
//         method:"GET",
//     });

//     if (response.ok) {
//         const serviceData = await response.json();//all the userdata now comes inside data
//         //console.log(serviceData.response);//.response is added so as the console should be only one object
//         setServices(serviceData.response);//will update all the details of user to setServices and user will now have all data

//     }
    
    
// } catch (error) {
//     //console.log(`Service Auth Error ${error}`);
// }

// }
// ADMIN USERs LOGIC

// const adminFuncUsers = async ()=>{
//     try {
//         const adminResponse = await fetch('https://graytm-wallet.onrender.com/admin/users',{
//             method:"GET",
//             headers:{
//                 Authorization:`Bearer ${tokenval}`//as from postman and token is already fetched above from the user logged in
//             },
//         });
//         if (adminResponse.ok) {
//             const aData= await adminResponse.json();
//             // //console.log(aData.adminResponse);
//             setAdminUserData(aData.adminResponse);
//             // //console.log(tokenval);
//             // //console.log(tokenval);
//             // setIsAdmin(true);
//         }
//         else{
//             //console.log("this is it",adminResponse);
//         }
        
//     } catch (error) {
//         //console.log(`Admin Panel  ${error}`);
//     }
// }




// ADMIN CONTACT/MESSAGES
// const adminFuncContacts = async ()=>{
//     try {
//         const adminContactResponse = await fetch('https://graytm-wallet.onrender.com/admin/contacts',{
//             method:"GET",
//             headers:{
//                 Authorization:`Bearer ${tokenval}`//as from postman and token is already fetched above from the user logged in
//             },
//         });
//         if ( adminContactResponse .ok) {
//             const aData= await  adminContactResponse.json();
//             // //console.log(aData.adminResponse);
//             setAdminContactData(aData.adminContactResponse );
//             // setIsAdmin(true);
//         }
//         else{
//             //console.log("this is it", adminContactResponse );
//         }
        
//     } catch (error) {
//         //console.log(`Admin Panel  ${error}`);
//     }
// }




// useEffect(() => {
//     const getBalance = async () => {
//       try {
//         const balanceResponse = await fetch('https://graytm-wallet.onrender.com/graytm/account/balance', {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${tokenval}` // assuming tokenval is accessible
//           },
//         });

//         if (balanceResponse.ok) {
//           const bData = await balanceResponse.json();
//           setBalance(bData.balance);
//           //console.log("Balance", bData.balance);
//         } else {
//           //console.log("Balance", balanceResponse);
//         }
//       } catch (error) {
//         //console.log(`Balance Side Error ${error}`);
//       }
//     };

//     getBalance();
//   }, []);

    useEffect(()=>{
    //for getting data of user from backend so that we can use it in the frontend
    //  getServices();
    //  adminFuncUsers();
    //  adminFuncContacts();
    //  getBalance();
    },[]);//so that the function is called once or first time

  
    // useEffect(()=>{
    //  loginFunc();
    //    },[user.isAdmin]);
    useEffect(() => {
        // Here you can perform any actions that should happen when isAdmin changes
        // For example, you can update the state, make API calls, etc.
        //console.log("isAdmin value changed:",  user.isAdmin);
        // //console.log("tok before:",  tokenval);
        // userDataCollection();
        // Set the value of isAdminn accordingly
        setIsAdminn(user.isAdmin);
      
      }, [user.isAdmin]); 


      useEffect(() => {
        // Function to fetch user data
        const userDataCollection = async () => {
          try {
            // Fetch user data only if tokenval is not null or empty
            if (tokenval) {
              const response = await fetch(`${BACKEND_URL}/user/data`, {
                method: "GET",
                headers: {
                  Authorization: `${tokenval}`
                },
              });
      
              if (response.ok) {
                const data = await response.json();
                console.log("user data", data.user);
                //console.log("user data", data.userData.isAdmin);
               
                setUser(data.user);
              } else {
                //console.log("Loading State Error");
              }
            }
          } catch (error) {
            //console.log("Error Fetching User Data", error);
          }
        };
      
        // Call userDataCollection when tokenval changes
        userDataCollection();
        
      }, [tokenval]); 


      const getBalance = async () => {
        try {
          const balanceResponse = await fetch(
            `${BACKEND_URL}/graytm/account/balance`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenval}`, // assuming tokenval is accessible
              },
            }
          );
  
          if (balanceResponse.ok) {
            const bData = await balanceResponse.json();
         
            setBalance(bData.balance);
            setAccountId(bData.acc);
            //console.log("id", bData.acc);
            //console.log("Balance", bData.balance);
          } else {
            //console.log("Balance", balanceResponse);
          }
        } catch (error) {
          //console.log(`Balance Side Error ${error}`);
        }
      };

      const getTransactions = async (userId) => {
        try {
          const response = await axios.get(`${BACKEND_URL}/graytm/account/transactions/${userId}`);
          //console.log(response);
          return response.data;
        } catch (error) {
          console.error('Error fetching transactions:', error);
          throw error;
        }
      };
  // useEffect(() => {
 

  //   getBalance();
  // }, [balance]);



return <AuthContext.Provider value={{isLoggedIn,storeTokenInLocal,logoutFunc,user,services,adminUserData,adminContactData,isAdminn,tokenval,balance,accountId,getBalance,getTransactions}}> {/* any components can access to the function mentioned  here */}
{/* isLoading,updateUserAdminStatus,isAdminn,loginFunc */}

{children}
</AuthContext.Provider>//also in the main.jsx we have to keep the whole app inside the AuthProvider
}


// value prop of provider is crucial because its where we define the data that we want to make accesible to the components




// CONSUMER BELOW

// export custom hook
export const useAuth =()=>{
return useContext(AuthContext)
// contains all the above context 

    // useAuth fuction now contains the value provided by the AuthContext.Provider up top in the component tree
}