import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // TODO: Implement createboard logic
  return {
    message: 'Create board endpoint',
    data: body
  }
})