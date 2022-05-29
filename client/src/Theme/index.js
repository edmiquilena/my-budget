import { extendTheme } from "@chakra-ui/react"
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}



export default extendTheme({
  config,
  colors: {  
brand: {
    primary:"#F4C84B",
    light:"#EBEBEB",
    mediumGrey:"#2C2C2C",
    darkGrey:"#1E1E1E",
    lightGrey:"#484747",
  gradient: "linear-gradient(126.97deg, #F4C84B 28.26%, #a98a31 91.2%)",
darkGradient: "linear-gradient(126.97deg, #a98a32 28.26%, #896910 91.2%)"
,accent: "#ffe6a0" } 
},
  components: {
   Input: {
     defaultProps: {
      variant: 'solid'
     },
     variants: {
       'solid': (props) => ({
      
        bg: 'brand.lightGrey',
       border: 'none'
        })
     }
   },
    Text: {
      defaultProps: {
        variant: 'solid'
      },

    },
    Spinner: {
      defaultProps: {
        variant: 'brand'
      },
      variants: {
        brand: {
          color: 'brand.primary',
          size: 'md'
        }
      }
    },
    Button: {
      defaultProps: {
        variant: 'solid'
      },
     
      variants: {
        'solid': {
          px: '6',
          fontSize: '1.2em',
          rounded: 'full',
          bg: 'brand.primary',
          color: 'brand.darkGrey',
          _hover: {
            bg: 'brand.darkGrey',
            color: 'brand.accent'
          },
          _active: {
            bg: 'brand.darkGrey',
            color: 'brand.accent'
          }
        },
      },
    },
  },




  styles: {
    global: (props) => ({
      html: {
        scrollBehavior: 'smooth'
      },
      body: {
        fontFamily: `Rubik, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif;`,
        bg: 'brand.darkGrey',
        
      },
      nav: {
        fontFamily: `'Rubik',sans-serif`
      }
    }),
  },
})