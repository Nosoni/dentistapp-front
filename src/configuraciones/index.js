require('dotenv').config({ path: "../../.env" })

const env = {
  server: process.env.REACT_APP_API_URL
}

export default env