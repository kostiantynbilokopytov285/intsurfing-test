import Lottie from 'react-lottie'

import loaderData from 'assets/loader.json'

const Loader = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loaderData
      }}
    />
  )
}

export default Loader
