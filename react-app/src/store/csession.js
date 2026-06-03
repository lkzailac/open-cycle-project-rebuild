
// constants
const SET_COMPANY = "csession/SET_COMPANY";
const REMOVE_COMPANY = "csession/REMOVE_COMPANY";

const setCompany = (company) => ({
    type: SET_COMPANY,
    payload: company
});

const removeCompany = () => ({
    type: REMOVE_COMPANY,
})

const initialState = { company: null };

  export const companyAuthenticate = () => async (dispatch) => {
    const response = await fetch('/api/cauth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setCompany(data))
    return data
  }

  export const companyLogin = (name, admin_email, password) => async (dispatch)  => {

    const response = await fetch('/api/cauth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        admin_email,
        password
      })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setCompany(data))
    return {};
  }

  export const companyLogout = () => async (dispatch) => {
    const response = await fetch("/api/cauth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    dispatch(removeCompany());
  };


  export const companySignUp = (name, admin_email, password, logo_url, statement, warehouse_location, products_sold, carbon_goal, carbon_goal_date) => async (dispatch)  => {

    const response = await fetch("/api/cauth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        admin_email,
        password,
        logo_url,
        statement,
        warehouse_location,
        products_sold,
        carbon_goal,
        carbon_goal_date,

      }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setCompany(data))
    return {};
  }

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_COMPANY:
            return {company: action.payload}
        case REMOVE_COMPANY:
            return {company: null}
        default:
            return state;
    }
}
