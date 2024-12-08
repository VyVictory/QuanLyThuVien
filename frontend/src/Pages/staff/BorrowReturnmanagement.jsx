import React from 'react'
import { useState, useEffect } from 'react'
export default function BorrowReturnmanagement() {

  return (
    <div class="w-full my-10">
      <h1 class="text-3xl font-bold text-center mb-8">Borrow/Return Management</h1>
      <div class="bg-card p-6 rounded-lg shadow-lg bg-white mx-10">
        <div class="flex items-center justify-between mb-4 gap-2">
          <input type="text" placeholder="Search Borrow/Return..." class="w-full px-3 py-2 rounded-md bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring focus:ring-primary" />
          <button class="bg-sky-400 text-primary-foreground px-4 py-2 rounded-md hover:bg-sky-500">Search</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-center">
            <thead>
              <tr>
                <th class="px-4 py-2">ID</th>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Role</th>
                <th class="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2">1</td>
                <td class="px-4 py-2">John Doe</td>
                <td class="px-4 py-2">Admin</td>
                <td class="px-4 py-2">
                  <button class="bg-teal-400 px-3 py-1 rounded-md mr-2 hover:bg-secondary/80">Edit</button>
                  <button class="bg-red-400 text-destructive-foreground px-3 py-1 rounded-md hover:bg-destructive/80">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
