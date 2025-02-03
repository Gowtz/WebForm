'use client'
import { getDashboardData } from '@/action/dashboard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const session = useSession()
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboardData })
  return (
    <div className='w-full max-w-6xl h-full mx-auto py-10'>
      {
        data &&
        <div>
            {session.data?.user
&&
              <h1 className='mb-5 text-3xl'> Hello, {session.data.user.name}</h1>
            }
          <div className="cardbox w-full rounded-xl flex  bg-zinc-100 dark:bg-zinc-800  p-5 h-56  gap-5 justify-between mb-20">
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-2xl mb-3' >Projects</h3>
              <h2 className='text-6xl'>{data.projectCount} <span className='text-zinc-500 text-4xl'>/ 5</span></h2>
            </div>
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-2xl mb-3'>Forms</h3>
              <h2 className='text-6xl'>{data.formCount} <span className='text-zinc-500 text-4xl'>/ 10</span></h2>
            </div>
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-2xl mb-3'>Form Recived</h3>
              <h2 className='text-6xl'>{data.formDataCount} </h2>
            </div>
          </div>
          <div>
              <h2 className='mb-5 text-xl'>Recent form submission</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    No
                  </TableHead>
                  <TableHead>
                    FormName
                  </TableHead>
                  <TableHead  className='text-right'>
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableCaption>

                  Your recent form recived
                </TableCaption>
              {data.formdata && data.formdata.map((formdata,index) =>
                <TableRow key={formdata.id}>
                  <TableHead>{index+1}</TableHead>
                  <TableHead>{formdata.api.Form[0].name}</TableHead>
                  <TableHead className='text-right'>{formdata.createdAt.toLocaleString()}</TableHead>

                </TableRow>
              )}
            </Table>
          </div>
        </div>

      }
    </div>
  )
}

