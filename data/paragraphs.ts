export type Paragraph = {
  text: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
};

export const paragraphs: Paragraph[] = [
  // Easy paragraphs – short, simple sentences
  { text: "The sun rises in the east and sets in the west.", difficulty: "easy" },
  { text: "A cat chased a mouse across the garden.", difficulty: "easy" },
  { text: "It was a bright and beautiful morning.", difficulty: "easy" },
  { text: "She baked a chocolate cake for the party.", difficulty: "easy" },
  { text: "Rainy days make me love my warm blanket.", difficulty: "easy" },
  { text: "The library was quiet and full of books.", difficulty: "easy" },
  { text: "He rode his bike down the hill fast.", difficulty: "easy" },
  { text: "The starry night sky glimmered above us.", difficulty: "easy" },
  { text: "Fresh coffee smells amazing in the kitchen.", difficulty: "easy" },
  { text: "Kids love to play in the playground.", difficulty: "easy" },

  // Medium paragraphs – a bit longer, varied vocabulary
  { text: "Technology has drastically changed the way we communicate, making instant connections across continents possible.", difficulty: "medium" },
  { text: "Exploring new cultures enriches our perspective and teaches us empathy towards different ways of life.", difficulty: "medium" },
  { text: "The ancient ruins stood silent, whispering stories of civilizations that once thrived in this land.", difficulty: "medium" },
  { text: "Learning to play a musical instrument requires patience, persistence, and a love for rhythm.", difficulty: "medium" },
  { text: "Sustainable energy solutions, such as solar and wind power, are vital for a greener future.", difficulty: "medium" },
  { text: "A compelling novel can transport readers to worlds they have never imagined.", difficulty: "medium" },
  { text: "Space exploration challenges humanity's ingenuity and expands our understanding of the universe.", difficulty: "medium" },
  { text: "Cooking with fresh ingredients brings out flavors that processed foods simply cannot match.", difficulty: "medium" },
  { text: "Mathematics is the language that describes patterns found in nature and technology.", difficulty: "medium" },
  { text: "The bustling city streets were illuminated by neon signs and the hum of traffic.", difficulty: "medium" },

  // Hard paragraphs – complex sentences, richer vocabulary
  { text: "When the algorithmic complexity of a problem escalates beyond polynomial time, researchers often resort to heuristic methods to obtain approximate solutions.", difficulty: "hard" },
  { text: "Quantum entanglement defies classical intuition, linking particles such that the state of one instantly influences the other, regardless of distance.", difficulty: "hard" },
  { text: "The delicate balance between economic growth and environmental stewardship poses a formidable challenge for policymakers worldwide.", difficulty: "hard" },
  { text: "In literature, the unreliable narrator technique provokes readers to question the authenticity of the presented reality.", difficulty: "hard" },
  { text: "Artificial intelligence systems, when trained on biased data, can inadvertently perpetuate societal prejudices.", difficulty: "hard" },
  { text: "The symphony's crescendo built tension, weaving motifs that resonated with the audience's collective anticipation.", difficulty: "hard" },
  { text: "Philosophers have long debated the nature of free will, pondering whether our choices are predetermined or truly autonomous.", difficulty: "hard" },
  { text: "The intricacies of cryptographic protocols ensure data confidentiality and integrity in an increasingly digital world.", difficulty: "hard" },
  { text: "Genetic engineering holds the promise of eradicating hereditary diseases, yet it raises profound ethical considerations.", difficulty: "hard" },
  { text: "Historical analysis of archival documents reveals nuanced power dynamics concealed beneath surface narratives.", difficulty: "hard" },

  // Expert paragraphs – programming code snippets, technical content
  { text: "#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 100; ++i) {\n        sum += i;\n    }\n    printf(\"Sum of 1 to 100 = %d\\n\", sum);\n    return 0;\n}\n", difficulty: "expert" },
  { text: "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));\n", difficulty: "expert" },
  { text: "public class Singleton {\n    private static Singleton instance;\n    private Singleton() {}\n    public static synchronized Singleton getInstance() {\n        if (instance == null) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n}\n", difficulty: "expert" },
  { text: "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nprint(quicksort([3,6,8,10,1,2,1]))\n", difficulty: "expert" },
  { text: "SELECT users.id, users.name, COUNT(posts.id) AS post_count\nFROM users\nLEFT JOIN posts ON posts.user_id = users.id\nGROUP BY users.id, users.name\nHAVING COUNT(posts.id) > 5;\n", difficulty: "expert" },
  { text: "<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"green\" stroke-width=\"4\" fill=\"yellow\" />\n</svg>\n", difficulty: "expert" },
  { text: "typedef struct {\n    char *title;\n    int pages;\n    bool hardcover;\n} Book;\n\nBook myBook = { \"The C Programming Language\", 274, true };\n", difficulty: "expert" },
  { text: "const async fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error('Network response was not ok');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n};\n", difficulty: "expert" },
  { text: "// Merge sort implementation in Go\nfunc mergeSort(arr []int) []int {\n    if len(arr) <= 1 {\n        return arr\n    }\n    mid := len(arr) / 2\n    left := mergeSort(arr[:mid])\n    right := mergeSort(arr[mid:])\n    return merge(left, right)\n}\n\nfunc merge(left, right []int) []int {\n    result := make([]int, 0, len(left)+len(right))\n    i, j := 0, 0\n    for i < len(left) && j < len(right) {\n        if left[i] < right[j] {\n            result = append(result, left[i])\n            i++\n        } else {\n            result = append(result, right[j])\n            j++\n        }\n    }\n    result = append(result, left[i:]... )\n    result = append(result, right[j:]... )\n    return result\n}\n", difficulty: "expert" },
  { text: "# SQL recursive CTE to list employee hierarchy\nWITH RECURSIVE EmployeeCTE AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees\n    WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, c.level + 1\n    FROM employees e\n    INNER JOIN EmployeeCTE c ON e.manager_id = c.id\n)\nSELECT * FROM EmployeeCTE ORDER BY level, name;\n", difficulty: "expert" }
];
