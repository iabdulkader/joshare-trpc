import { decodeUser, getUser } from './../utlis/token';
import { NextApiRequest, NextApiResponse } from 'next'
import { userModel } from '../models/users.model'
import dbConnect from '../db/mongoose'
import { User } from '../types'



export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  let user: User | null = null;

  if(req.cookies.token) {
    user = decodeUser(req.cookies.token)
  }

  await dbConnect();
  return { req, res, userModel, user }
}

export type Context = ReturnType<typeof createContext>
