export { default } from "next-auth/middleware"

export const config = { matcher: ["/account/bag", "/account/profile", "/account/favorites"] }
