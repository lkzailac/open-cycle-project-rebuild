// export const authenticate = async() => {
//     const response = await fetch('/api/cauth/',{
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return await response.json();
//   }

//   export const login = async (name, admin_email, password) => {
//     const response = await fetch('/api/cauth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name,
//         admin_email,
//         password
//       })
//     });
//     return await response.json();
//   }

//   export const logout = async () => {
//     const response = await fetch("/api/cauth/logout", {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });
//     return await response.json();
//   };


//   export const signUp = async (name, admin_email, password, logo_url, statement, warehouse_location, products_sold, carbon_goal, carbon_goal_date) => {
//     const response = await fetch("/api/cauth/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         admin_email,
//         password,
//         logo_url,
//         statement,
//         warehouse_location,
//         products_sold,
//         carbon_goal,
//         carbon_goal_date,

//       }),
//     });
//     return await response.json();
//   }
