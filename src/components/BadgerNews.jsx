import { NavigationContainer } from "@react-navigation/native";
import { useState, useContext } from "react";
import PrefContext from "./contexts/PrefsContext";

import BadgerTabs from "./navigation/BadgerTabs";
import CS571 from "@cs571/mobile-client";

export default function BadgerNews(props) {
  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState([]);

  return (
    <>
      <PrefContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </PrefContext.Provider>
    </>
  );
}
