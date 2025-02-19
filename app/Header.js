"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Explore from "../components/widget/Explore.js";
import Language from "../components/widget/Language.js";
import IsLoggedIn from "../components/widget/login/IsLoggedIn.js";
import styles from "./Header.module.css";

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!isExplorePage) {
      setSearchTerm("");
    }
  }, [isExplorePage]);

  const searchParams = useSearchParams();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div
            className={`${styles.logo} ${styles.backgroundImageLogo}`}
            onClick={() => {
              router.push("/");
            }}
          ></div>
          <div
            className={`${styles.logo} ${styles.name} ${styles.backgroundImageName}`}
            onClick={() => {
              router.push("/");
            }}
          ></div>
          <Explore />
        </div>
        {isExplorePage ? (
          <div className={styles.navContainer}>
            <img
              src="/icons/search.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
            <input
              type="text"
              className={styles.searchBar}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  let path = `/explore?name=${encodeURIComponent(searchTerm)}`;
                  if (searchParams.get("category")) {
                    path = `/explore?category=${searchParams.get(
                      "category"
                    )}&name=${encodeURIComponent(searchTerm)}`;
                  }
                  router.push(path);
                }
              }}
            ></input>
          </div>
        ) : (
          <div
            className={styles.navContainer}
            onClick={() => router.push("/explore")}
          >
            <img
              src="/icons/search.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
          </div>
        )}
        <Language />
        <IsLoggedIn />
      </div>
    </>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  );
}
