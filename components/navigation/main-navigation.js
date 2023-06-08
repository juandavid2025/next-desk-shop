import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

import { signOut, useSession } from "next-auth/react";

import { useTheme } from "@emotion/react";
import styles from "./main-navigation.module.css";

function MainNavigation() {
  const router = useRouter();
  const theme = useTheme();
  const { data, status } = useSession();

  const loggedIn = data && status === "authenticated";

  function LoginButtonHandler() {
    router.push("/auth");
  }

  return (
    <AppBar position="static" color="primary" className={styles.appBar}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1 }}
        color="tertiary"
      >
        <Link href="/" className={styles.title} color={theme.primary}>
          Desky
        </Link>
      </Typography>
      <nav>
        <ul className={styles.navList}>
          {loggedIn && (
            <li>
              <Link href="/profile" className={styles.navLink}>
                Profile
              </Link>
            </li>
          )}
          <li>
            {!loggedIn && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={LoginButtonHandler}
              >
                Login
              </Button>
            )}

            {loggedIn && (
              <Button variant="contained" color="secondary" onClick={signOut}>
                LogOut
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </AppBar>
  );
}

export default MainNavigation;
