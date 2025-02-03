'use client'
import { getDashboardData } from '@/action/dashboard'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSession } from 'next-auth/react'
import { useStore } from '@/hooks/store'

export default function Dashboard() {
  const session = useSession()
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboardData })
  const {fetchForms, fetchProjects } = useStore()
  useEffect(() => {
    fetchForms()
    fetchProjects()
  }, [])
  return (
    <div className='w-full max-w-6xl h-full mx-auto py-10'>
      {
        data &&
        <div>
          {session.data?.user
            &&
            <h1 className='mb-5 text-3xl'> Hello, {session.data.user.name}</h1>
          }
          <div className="cardbox w-full rounded-xl flex  bg-zinc-100 dark:bg-zinc-800  p-5   gap-5 justify-between mb-20">
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-xl mb-3' >Projects</h3>
              <h2 className='text-3xl'>{data.projectCount} <span className='text-zinc-500 text-xl'>/ 5</span></h2>
            </div>
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-xl mb-3'>Forms</h3>
              <h2 className='text-3xl'>{data.formCount} <span className='text-zinc-500 text-xl'>/ 10</span></h2>
            </div>
            <div className="projectCard w-full bg-zinc-200 dark:bg-zinc-900  dark:border-zinc-600 border p-5 rounded-xl flex flex-col pl-10 justify-center">
              <h3 className='text-xl mb-3'>Form Recived</h3>
              <h2 className='text-3xl'>{data.formDataCount} </h2>
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
                  <TableHead className='text-right'>
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableCaption>

                Your recent form recived
              </TableCaption>
                <TableBody>

              {data.formdata && data.formdata.map((formdata, index) =>
                <TableRow key={formdata.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{formdata.api.Form[0].name}</TableCell>
                  <TableCell className='text-right'>{formdata.createdAt.toLocaleString()}</TableCell>

                </TableRow>
              )}
                </TableBody>
            </Table>
          </div>
        </div>

      }
    </div>
  )
}

