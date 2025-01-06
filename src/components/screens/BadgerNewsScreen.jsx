import { useEffect, useState, useContext } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import BadgerNewsItemCard from "./BadgerNewsItemCard";
import PrefContext from "../contexts/PrefsContext";

function BadgerNewsScreen(props) {
  const [newsList, setNewsList] = useState([]);
  const navigation = useNavigation();
  const [prefs, setPrefs] = useContext(PrefContext);

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw8/articles", {
      headers: {
        "X-CS571-ID":
          "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data);
        setPrefs(getTags(data));
      });
  }, []);

  function getTags(data) {
    const tags = data.map((newsItem) => newsItem.tags);
    const tagsList = tags.flat();
    const uniqueTagsList = [...new Set(tagsList)];
    return uniqueTagsList;
  }

  function handlePress(newsItem) {
    navigation.navigate("Article", {
      fullArticleId: newsItem.fullArticleId,
      img: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${newsItem.img}`,
      title: newsItem.title,
    });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        {newsList
          .filter((newsItem) =>
            newsItem.tags.some((tag) => prefs.includes(tag))
          )
          .map((newsItem) => (
            <BadgerNewsItemCard
              key={newsItem.id}
              style={styles.card}
              onPress={() => handlePress(newsItem)}
            >
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/CS571-F24/hw8-api-static-content/main/${newsItem.img}`,
                }}
                alt={newsItem.title}
                style={styles.image}
              />

              <Text style={styles.title}>{newsItem.title}</Text>
            </BadgerNewsItemCard>
          ))}

        {newsList.filter((newsItem) =>
          newsItem.tags.some((tag) => prefs.includes(tag))
        ).length === 0 && <Text style={styles.title}>No news to display</Text>}
      </ScrollView>
    </View>
  );
}

export default BadgerNewsScreen;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 8,
    width: "95%", // 90% of the screen
    height: 220,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
