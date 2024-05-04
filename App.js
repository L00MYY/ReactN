import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [backgroundColor, setBackgroundColor] = useState('#F0F8FF');

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
      setBackgroundColor('#F0F8FF');
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
    setBackgroundColor('#F5DEB3'); 
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Image
            style={{ width: 35, height: 35 }}
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png" }} //icon para borrar
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={styles.input}
        placeholder="Añade una tarea"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Tarea" : "Tarea"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: "#8B0000", 
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#6495ED", 
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    backgroundColor: "#EEE8AA", 
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  taskButtons: {
    flexDirection: "row",
    gap: 10,
  },
  itemList: {
    fontSize: 18,
  },
});
}
export default App;

