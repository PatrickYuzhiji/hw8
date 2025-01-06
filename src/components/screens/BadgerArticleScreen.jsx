import { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Linking,
  Button,
} from "react-native";

// Additionally, the user should be displayed a message along the lines of "The content is loading!"
//  while waiting for the body paragraphs to load.
//
// Furthermore, loading the additional content of
// the article must be animated. It may fade in, grow in size, or do some animation using Animated
// or some other third-party library. After finishing reading the article, the user should be able
// to to return to the list of short summaries.
//
// If they re-visit the story, the animation should occur again.

function BadgerArticlesScreen(props) {
  const [article, setArticle] = useState(null);
  const { fullArticleId, img, title } = props.route.params;
  const fadeAnim = useRef(new Animated.Value(0));

  useEffect(() => {
    fetch(`https://cs571.org/rest/f24/hw8/article?id=${fullArticleId}`, {
      headers: {
        "X-CS571-ID":
          "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      });
  }, [props]);

  useEffect(() => {
    Animated.timing(fadeAnim.current, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [article]);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    };
    return (
      <Button
        style={styles.buttonLink}
        title={children}
        onPress={handlePress}
      />
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        <Image
          source={{
            uri: img,
          }}
          alt={title}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        {!article ? (
          <Text>The content is loading!</Text>
        ) : (
          <Animated.View style={{ opacity: fadeAnim.current }}>
            <Text style={styles.author}>
              By {article.author} on {article.posted}
            </Text>
            <OpenURLButton url={article.url}>Read Full Article</OpenURLButton>

            <Text style={styles.content}>{article.body}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

export default BadgerArticlesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  author: {
    fontSize: 12,
    marginBottom: 16,
    fontStyle: "italic",
  },
  buttonLink: {
    alignItems: "flex-start", // Align the button to the left
  },
});
