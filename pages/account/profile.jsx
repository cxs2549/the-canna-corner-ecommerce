import { useSession, signIn, signOut } from "next-auth/react"

const profile = ({ Container }) => {
  const { data: session } = useSession()
  return (
    <Container classes="relative block">
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover "
        style={{
          backgroundImage:
            "url('http://unsplash.it/1200?random&gravity=center')",
        }}
      >
        <div className="absolute w-9/12 top-12 bg-white z-10 left-1/2 -translate-x-1/2 rounded-xl p-5 flex">
          {/* avatar */}
          <div className="absolute h-12 w-12 -right-2  -top-4 bg-red-200 rounded-full overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="" />
          </div>
          {/* list */}
          <ul className="mt-4 w-full">
            <li className=" w-full flex items-center py-2">Lastest orders</li>
            <li className=" w-full flex items-center py-2">Member since</li>
            <li className=" w-full flex items-center py-2">Favorite strain</li>
            <li
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
              className="w-full flex items-center justify-center py-2 bg-red-400 cursor-pointer"
            >
              Sign out
            </li>
          </ul>
        </div>
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
      <section className="bg-white " style={{ height: "550px" }}></section>
    </Container>
  )
}
export default profile
