import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@100xharshith/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInput] = useState<signupInput>({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data.jwt;
            if (jwt) {
                localStorage.setItem("token", `Bearer ${jwt}`);
                navigate("/blogs");
            } else {
                console.error("API did not return a token. Full response:", response.data);
                //alert("JWT token not received. Check console for details.");
            }
        } catch (e) {
            console.error("Error during signup or signin:", e);
            alert("Error occurred during signup or signin. Check console for details.");
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center shadow-lg rounded-md">
            <div className="shadow-xl p-14 rounded-lg">
                <div className="text-3xl font-extrabold">Create an account</div>
                <div className="text-md mt-1 text-center text-gray-400">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link
                        to={type === "signup" ? "/signin" : "/signup"}
                        className="pl-1 underline"
                    >
                        {type === "signin" ? "Sign Up" : "Sign In"}
                    </Link>
                </div>
                <LabelledInput
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    onChange={(e) =>
                        setPostInput((c) => ({
                            ...c,
                            email: e.target.value
                        }))
                    }
                />
                {type === "signup" ? (
                    <LabelledInput
                        label="Name"
                        placeholder="John Doe"
                        onChange={(e) =>
                            setPostInput((c) => ({
                                ...c,
                                name: e.target.value
                            }))
                        }
                    />
                ) : null}
                <LabelledInput
                    label="Password"
                    placeholder="password@123"
                    type={"password"}
                    onChange={(e) =>
                        setPostInput((c) => ({
                            ...c,
                            password: e.target.value
                        }))
                    }
                />
                <button
                    type="button"
                    onClick={sendRequest}
                    className="text-white w-full mt-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                    {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="pt-4">
            <label className="block mb-2 mt-2 text-sm font-bold text-gray-900">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}