require('dotenv').config({ path: "../../.env" })

const env = {
  server: process.env.NODE_ENV === 'development' ? "http://localhost:3030" : process.env.REACT_APP_API_URL
}

export default env