import axios from "axios";

import {
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  EDIT_EXPERIENCE_SUCCESS,
  EDIT_EXPERIENCE_FAIL,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  PROFILE_LOADED,
  PROFILE_NOTLOADED,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  ADD_SOCIALS_SUCCESS,
  ADD_SOCIALS_FAIL,
  ADD_ABOUT_SUCCESS,
  ADD_ABOUT_FAIL,
  GET_EXPERIENCE_SUCCESS,
  GET_EXPERIENCE_FAIL,
  GET_EDUCATION_SUCCESS,
  GET_EDUCATION_FAIL,
  EDIT_EDUCATION_SUCCESS,
  EDIT_EDUCATION_FAIL,
  GET_DEVELOPERS_SUCCESS,
  GET_DEVELOPERS_FAIL,
  GET_DEVELOPER_SUCCESS,
  GET_DEVELOPER_FAIL
} from "./constants";

import { setAlert, redirect } from "./general";
import { loadUser } from "./auth";
//Add Experience

export const loadProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/me");
    dispatch({
      type: PROFILE_LOADED,
      payload: {
        about: res.data.about,
        experience: res.data.experience,
        education: res.data.education,
        contact: res.data.contact
      }
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOTLOADED
    });
  }
};

//___________________ADD____________________

export const addExperience = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.post("/api/profiles/experience", body, config);

    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Experience Created!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: ADD_EXPERIENCE_FAIL
    });
  }
};

export const addEducation = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/profiles/education", body, config);
    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("Education Added!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: ADD_EDUCATION_FAIL
    });
  }
};

//_______________________ADD?EDIT_________________
// Add/ Edit Contact
export const addContact = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(formData);
    const res = await axios.post("/api/profiles/contact", body, config);
    dispatch({
      type: ADD_CONTACT_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("Changes saved!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: ADD_CONTACT_FAIL
    });
  }
};

// Add/ Edit Social Contacts
export const addSocials = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/profiles/contact/socials", body, config);
    dispatch({
      type: ADD_SOCIALS_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("Changes saved!", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: ADD_SOCIALS_FAIL
    });
  }
};

//Edit my info - About

export const editAbout = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(formData);

    const res = await axios.post("/api/profiles/about", body, config);

    dispatch({
      type: ADD_ABOUT_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Changes are saved!", "success"));

    dispatch(redirect("home"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ADD_ABOUT_FAIL
    });
  }
};

//______________Delete_______________

export const deleteExperience = exp_id => async dispatch => {
  try {
 
    const res = await axios.delete(`/api/profiles/experience/${exp_id}`)

    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL
    });
  }
};



export const editExperience = (formData, exp_id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const body = JSON.stringify(formData);

    const res = await axios.patch(`/api/profiles/experience/${exp_id}`, body, config);

    dispatch({
      type: EDIT_EXPERIENCE_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Experience Edited!", "success"));
    dispatch(redirect("home"));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: EDIT_EXPERIENCE_FAIL
    });
  }
};
export const getExperience = exp_id => async dispatch => {
  try {

    const res = await axios.get(`/api/profiles/experience/${exp_id}`)

    dispatch({
      type: GET_EXPERIENCE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert("Edit experience here!", "primary"))

  } catch (err) {
    dispatch({
      type: GET_EXPERIENCE_FAIL
    });
  }
};


///-------------------Education--------------

export const editEducation = (formData, exp_id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const body = JSON.stringify(formData);

    const res = await axios.patch(`/api/profiles/education/${exp_id}`, body, config);

    dispatch({
      type: EDIT_EDUCATION_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert("Education Edited!", "success"));
    dispatch(redirect("home"));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(elem => dispatch(setAlert(elem.msg, "danger")));
    }
    dispatch({
      type: EDIT_EDUCATION_FAIL
    });
  }
};
export const getEducation = edu_id => async dispatch => {
  try {

    const res = await axios.get(`/api/profiles/education/${edu_id}`)

    dispatch({
      type: GET_EDUCATION_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert("Edit education here!", "primary"))

  } catch (err) {
    dispatch({
      type: GET_EDUCATION_FAIL
    });
  }
};

// Delete education

export const deleteEducation = edu_id => async dispatch => {
  try {

    const res = await axios.delete(`/api/profiles/education/${edu_id}`)

    dispatch({
      type: DELETE_EDUCATION_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: DELETE_EDUCATION_FAIL
    });
  }
};




