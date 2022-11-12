import { Card } from "flowbite-react";
import React, { useEffect, useReducer } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";

const initialState = {
  loading: true,
  data: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        loading: true,
      };
    case "success":
      return {
        loading: false,
        data: action.payload,
      };
    case "failed":
      return {
        loading: false,
        error: action.payload,
      };
  }
};
const Host = (props) => {
  // Fetch the specific HOST
  const [user, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const docRef = doc(db, "users", props.data);
    getDoc(docRef)
      .then((doc) => {
        console.log("dd" + doc.data());
        dispatch({ type: "success", payload: doc.data() });
      })
      .catch((error) => {
        console.log("error" + error);
        dispatch({ type: "failed", payload: error.message });
      });
  }, [props.data]);

  console.log("userr " + user.data);

  return (
    <div id="host" className="h-auto mb-4">
      <p className="text-2xl mb-3">Host</p>
      <div className="w-full">
        <Card>
          <div className="flex items-center justify-between ">
            <div>
              <img
                className="mb-3 h-20 w-20 rounded-full shadow-lg"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Bonnie Green
              </h5>
            </div>
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-cyan-600 py-2 px-4 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-cyan-800 dark:hover:bg-cyan-800 dark:focus:ring-cyan-800"
            >
              Show reviews
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Host;
