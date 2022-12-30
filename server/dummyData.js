// import Script from './models/script'
import User from './models/user'

export default function() {
  User.count().exec((err, count) => {
    if (count > 0) {
      return
    }

    const user1 = new User({
      userId: 'Id001',
      email: 'reactprompter@example.com',
      name: 'John Smith',
      picture: 'https://asset.reactprompter.com/image1.jpg',
      scripts: [
        {
          title: 'Monday',
          text: 'script 1'
        },
        {
          title: 'Tuesday',
          text: 'script 2'
        }
      ]
    })

    const user2 = new User({
      userId: 'Id002',
      email: 'reactivemachine@example.com',
      name: 'Jane Doe',
      picture: 'https://asset.reactprompter.com/image2.jpg',
      scripts: [
        {
          title: 'Monday',
          text: 'My script 1'
        },
        {
          title: 'Friday',
          text: 'My script 2'
        }
      ]
    })

    User.create([user1, user2], (error) => {
        if (!error) {
          console.log('Dummy data inserted')
        } else {
          console.log('error', error)
        }
      })
  })
  // Script.count().exec((err, count) => {
  //   if (count > 0) {
  //     return
  //   }
  //
  //   const text1 = `Sed ut perspiciatis unde omnis iste natus error
  //     sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
  //     eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
  //     vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
  //     aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
  //     qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
  //     ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  //     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  //     enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
  //     ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
  //     in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
  //     occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
  //     est laborum`
  //
  //   const text2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  //     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  //     enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
  //     ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
  //     in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
  //     occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
  //     est laborum. Sed ut perspiciatis unde omnis iste natus error
  //     sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
  //     eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
  //     vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
  //     aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
  //     qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
  //     ipsum quia dolor sit amet.`
  //
  //   const script1 = new Script({ text: text1 })
  //   const script2 = new Script({ text: text2 })
  //
  //   Script.create([script1, script2], (error) => {
  //     if (!error) {
  //       console.log('Dummy data inserted')
  //     }
  //   })
  // })
}
