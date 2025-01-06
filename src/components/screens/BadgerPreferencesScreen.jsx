// The user should be able to apply their news preferences via the
// "Preferences" tab. This tab should display switches (on: opt in, off: opt out)
//  for each of the unique tags. You may NOT hardcode the list of unique tags;
//  instead, you must iterate over all of the tags of the story summaries to create this list.

// By default, the user should opt in to all content. However, the user should
// be able to toggle their preferences on and off. If the user has a preference
// toggled off, any news story with that tag should not be displayed to the user.
// If the user's preferences are so restrictive that there are no articles to be
// displayed, a message should be displayed saying so (it is also okay for this
//     message to be displayed while the short summaries are loading).

// I would recommend creating and using a context to store the users preferences.

import React, { Text, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { Switch, StyleSheet } from "react-native";
import BagerNewsItemCard from "./BadgerNewsItemCard";

import PrefContext from "../contexts/PrefsContext";

function BadgerPreferencesScreen(props) {
  const [prefs, setPrefs] = useContext(PrefContext);
  const [initialPrefs, setInitialPrefs] = useState([]);
  const [isInitialPrefsSet, setIsInitialPrefsSet] = useState(false);

  useEffect(() => {
    if (!isInitialPrefsSet && prefs.length > 0) {
      setInitialPrefs(prefs);
      setIsInitialPrefsSet(true);
    }
  }, [prefs, isInitialPrefsSet]);

  return (
    <View style={styles.container}>
      {initialPrefs.map((tag) => (
        <BagerNewsItemCard key={tag} style={styles.card}>
          <Text style={styles.text}>
            {(prefs.includes(tag) ? "Showing" : "Not showing") + " "}
            {tag}
          </Text>
          <Switch
            value={prefs.includes(tag)}
            onValueChange={(value) => {
              if (value) {
                setPrefs([...prefs, tag]);
              } else {
                setPrefs(prefs.filter((pref) => pref !== tag));
              }
            }}
          />
        </BagerNewsItemCard>
      ))}
    </View>
  );
}

export default BadgerPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
  },
});
