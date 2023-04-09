import { useSession } from "../../lib/Session";

// const AuthButton: React.FC = () => {
//   const session = useSession();  

//   if (session?.user) {
//     return (
//       <>
//         <AvatarButton />
//         <ThemeButton />
//       </>
//     )
//   }
//   else {
//     return (
//       <>
//         <SignInButton />
//         <ThemeButton />
//       </>
//     )
//   }
// }

const Welcome: React.FC = () => {
    const session = useSession();
    console.log(session?.user?.displayName)
  return (
    <div>
        <h1>Welcome {`${session?.user?.displayName}`}</h1>
    </div>
  );
}
  
export default Welcome;