import { configureStore } from '@reduxjs/toolkit'
import credential from '../features/credential/credential-slicer'

export default configureStore({
  reducer: {
    credential
  }
})