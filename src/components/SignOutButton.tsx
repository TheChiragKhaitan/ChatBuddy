'use client'

import { ButtonHTMLAttributes, FC, useState } from 'react'
import Button from './ui/Button'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Loader2, LogOut } from 'lucide-react'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  
    const [isSignOut, setisSignOut] = useState<boolean>(false)

    return (
    <Button {...props} variant='ghost' onClick={async () =>{
        setisSignOut(true)
        try {
            await signOut()
        } catch (error) {
            toast.error('There was a problem Signing Out')
        }finally {
            setisSignOut(false)
        }
    }}>
        {isSignOut ? (<Loader2 className='animate-spin h-4 w-4'/>) : (<LogOut className='w-4 h-4'/>)}
    </Button>
)}

export default SignOutButton