import { Button, FormControlLabel, Radio } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-3 bg-white p-8 w-[450px] rounded-[20px] font-sans">
      {/* Email */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Email</label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2 focus-within:border-[#2d79f3] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
            <g data-name="Layer 3">
              <path d="M30.853 13.87a15 15 0 0 0-29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0-1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1-4.158-.759v-10.856a1 1 0 0 0-2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6z" />
            </g>
          </svg>
          <input
            type="email"
            placeholder="Enter your Email"
            className="ml-2 border-none w-full h-full outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Password</label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2 focus-within:border-[#2d79f3] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-64 0 512 512">
            <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48zM48 224c-8.813 0-16 7.168-16 16v224c0 8.832 7.187 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.187-16-16-16H48z" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80C64 57.406 121.406 0 192 0s128 57.406 128 128v80c0 8.832-7.168 16-16 16z" />
          </svg>
          <input
            type="password"
            placeholder="Enter your Password"
            className="ml-2 border-none w-full h-full outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Remember + Forgot */}
      <div className="flex flex-row items-center justify-between text-sm text-black">
        <FormControlLabel control={<Radio size="small" />} label="Remember me" />
        <span className="text-[#2d79f3] font-medium cursor-pointer">Forgot password?</span>
      </div>

      {/* Submit */}
      <button type="submit" className="mt-5 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer">
        Sign In
      </button>

      {/* Signup link */}
      <p className="text-center text-sm text-black">
        Don’t have an account?
        <span className="text-[#2d79f3] font-medium cursor-pointer ml-1">Sign Up</span>
      </p>

      {/* Or with */}
      <p className="text-center text-sm text-black border-b border-t py-2">Or With</p>

      {/* Social Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outlined"
          className="h-[50px] rounded-[10px] normal-case flex gap-2 justify-center items-center"
          startIcon={<GoogleIcon />}
          fullWidth
        >
          Google
        </Button>

        <Button
          variant="outlined"
          className="h-[50px] rounded-[10px] normal-case flex gap-2 justify-center items-center"
          startIcon={<AppleIcon />}
          fullWidth
        >
          Apple
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
