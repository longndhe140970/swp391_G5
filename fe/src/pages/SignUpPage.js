import { useState } from "react";
import { AUTH_API } from "../services/constant";
import { sendRequest } from "../services/sendRequest";
import { customToast } from "../toasts";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [role, setrole] = useState("");
    const handleSignup = async (e) => {
      e.preventDefault();
      try {

        const dataResponse = await sendRequest({
            method: 'POST',
            endpoint: `${AUTH_API.SIGNUP}`,
            data: {
                username: username,
                password: password,
                fullname: fullname,
                role: role
            }
        });
        console.log(dataResponse);

    } catch (error) {
        const errorMessage = error?.response?.data?.message;
        customToast({ type: "error", message: errorMessage ?? "Dang ky khong thanh cong" });
    }
    }

    return ( <>
    <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <form method="POST" action="#" onSubmit={handleSignup}>
      <div>
        <label class="block text-sm font-medium text-gray-700" for="username">
          Username
        </label>
        <div class="mt-1">
          <input class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required="" autocomplete="username" type="text" name="username" id="username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
          />

        </div>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700" for="fullname">
          Fullname
        </label>
        <div class="mt-1">
          <input class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required="" autocomplete="fullname" type="text" name="fullname" id="fullname"
          onChange={(e)=>setFullname(e.target.value)}
          value={fullname}
          />
        </div>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700" for="email">
          Email address
        </label>
        <div class="mt-1">
          <input class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required="" autocomplete="email" type="email" name="email" id="email"/>
        </div>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700" for="password">
          Password
        </label>
        <div class="mt-1">
          <input class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required="" autocomplete="current-password" type="password" name="password" id="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          />
        </div>
      </div>

      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700" for="confirm-password">
          Confirm Password
        </label>
        <div class="mt-1">
          <input class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required="" autocomplete="current-password" type="password" name="confirm-password" id="confirm-password"/>
        </div>
      </div>
      
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700" for="role">
          Role
        </label>
        <div class="mt-1">
          <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required=""name="role" id="role"
          onChange={(e)=>setrole(e.target.value)}
          value={role}
          >
            <option>Customer</option>
            <option>Employee</option>
          </select>
        </div>
      </div>



      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center">
          <input class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" type="checkbox" name="terms-and-condition" id="terms-and-condition"/>
          <label class="ml-2 block text-sm text-gray-900" for="terms-and-condition">
            I agree to the terms and conditions
          </label>
        </div>
      </div>

      <div class="mt-6">
        <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
          Sign up
        </button>
      </div>
    </form>
  </div>
</div>
</div>

    </> );
}
 
export default SignUpPage;