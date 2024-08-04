
import{ Link} from "react-router-dom"
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20"
          />
        </Link>

        <p>2024 Eazy-Event. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer