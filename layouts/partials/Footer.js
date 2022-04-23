import { Typography, Container, Link as MuiLink } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#FFF',
        padding: '30px',
    },
}))

export default function Footer() {
    const classes = useStyles()
    return (
    <footer class="p-4 bg-white sm:p-6 mt-11">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" class="mr-4 h-10" alt="FlowBite Logo"> */}
            <div><Image src="/logo-bemedia.svg" width={100} height={100} alt="bemedia"/></div>
            <span style={{color: '#171dcd'}} class="self-center text-xl font-semibold whitespace-nowrap font-mono">BeeMedia</span>
          </div>
        </div>
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center font-mono">© 2022 BeeMedia All Rights Reserved
          </span>
        </div>
    </footer>
    )
}