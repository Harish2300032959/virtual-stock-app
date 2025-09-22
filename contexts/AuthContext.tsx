"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthContextType } from "@/types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists in localStorage (mock database)
      const existingUsers = JSON.parse(localStorage.getItem("mock_users") || "[]")
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      const mockToken = `mock_token_${Date.now()}`
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance || 100000,
        createdAt: user.createdAt,
      }

      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("auth_user", JSON.stringify(userData))
      setToken(mockToken)
      setUser(userData)
    } catch (error: any) {
      throw new Error(error.message || "Login failed")
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("mock_users") || "[]")
      const userExists = existingUsers.find((u: any) => u.email === email)

      if (userExists) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, this would be hashed
        balance: 100000, // Starting virtual balance
        createdAt: new Date().toISOString(),
      }

      // Save to mock database
      existingUsers.push(newUser)
      localStorage.setItem("mock_users", JSON.stringify(existingUsers))

      const mockToken = `mock_token_${Date.now()}`
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
        createdAt: newUser.createdAt,
      }

      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("auth_user", JSON.stringify(userData))
      setToken(mockToken)
      setUser(userData)
    } catch (error: any) {
      throw new Error(error.message || "Registration failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    setToken(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
