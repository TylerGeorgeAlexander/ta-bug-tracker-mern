import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <div className="m-2 rounded-lg">
          <div
            className="hero min-h-screen p-2"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1630686839116-56bc0ab9deb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80")` }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">bugTracker</h1>
                <p className="mb-5">
                  bugTracker v1.0 is a product that helps build itself! This issue
                  tracker is a full stack application using MongoDB, Express, React,
                  and Node. Here we track the default application (bugTracker)
                  across its life cycle to become the best bug ticket web
                  application.
                </p>
                <Link to="bugs" className="btn btn-primary">
                  Go to Current Issues
                </Link>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Index;
