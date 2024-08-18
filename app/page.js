'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid, Paper } from "@mui/material";
import Head from 'next/head';
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/generate');
  };

  const handleViewSavedFlashcards = () => {
    router.push('/flashcards');
  };

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const error = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if(error){
      console.warn(error.message)
    }
  }

  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session_basic', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const error = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if(error){
      console.warn(error.message)
    }
  }

  return(
    <Container 
      maxWidth="100vw"
      sx={{
        backgroundColor: '#efcfcd', // Background color
        minHeight: '100vh', // Ensure full viewport height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text"/>
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff' }}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
          py: 6,
          backgroundColor: '#333', color: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2, backgroundColor: '#78a98e'}} onClick={handleGetStarted}>Get Started</Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, ml: 2, backgroundColor: '#78a98e' }}
          onClick={handleViewSavedFlashcards}
        >
          View Saved Flashcards
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Easy Text Input
              </Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
      <Typography variant="h4" gutterBottom>Pricing</Typography>
      <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px Solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              backgroundColor: '#ffffff', // Card background color
              boxShadow: 2,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f0a500', '&:hover': { backgroundColor: '#d48f00' } }} onClick={handleSubmitBasic}>
                Choose basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px Solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              backgroundColor: '#ffffff', // Card background color
              boxShadow: 2,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#f0a500', '&:hover': { backgroundColor: '#d48f00' } }} onClick={handleSubmit}>
                Choose pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container>
  )
}
