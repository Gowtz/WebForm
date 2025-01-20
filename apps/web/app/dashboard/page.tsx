import { getAllProject } from '@/actions/projects'
import React from 'react'
import Projects from './project'

export default async function page() {
  return (
    <div >
      <Projects />
      <h3 className='text-secondary-foreground opacity-80 text-center text-md my-10'>Your Projects</h3>
    </div>
  )
}
