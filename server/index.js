

const express = require("express");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const web3 = new Web3("https://crimson-wider-brook.ethereum-sepolia.quiknode.pro/098488dc3702aa4eef450580158db0fc0317eb19/");

const contractAddress = "0x64AB50eE67fB22dae560A8663c31fB1C3eE1f278";

const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract);

// test the program
// const viewTask = async (req , res ) => {
//     const task = await contract.methods.viewTask(2).call();
//     console.log(task);
// }
// viewTask();

app.get("/api/etherum/view-task/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await contract.methods.viewTask(taskId).call();
    console.log(task);
    const { id, name, date } = task;
    const NumId = Number(id);
    const taskObj = {
      NumId,
      name,
      date
    }

    return res.status(200).json({ status: 200, taskObj, message: "task Exist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });

  }
});

app.get("/api/etherum/view-all-task", async (req, res) => {
  try {
    const task = await contract.methods.allTask().call();
    console.log(task);
    if (task.length < 0) {
      return res.status(400).json({ message: "no tasks yet!" })
    }
    if (task.length > 0) {
      const TaskList = task.map((task) => {
        return {
          id: Number(task.id),
          name: task.name,
          date: task.date
        }
      })
      console.log(TaskList)
      return res.status(200).json({ status: 200, TaskList, message: "All task" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

app.post("/api/ethurem/create-task", async (req, res) => {
  try {
    const { date, name } = req.body;
    console.log(date, name);
    const task = await contract.methods.allTask().call();
    console.log(task)
    const tasks = task.map((ts) => {
      return {
        name: ts.name,
        date: ts.date,
        id: Number(ts.id)
      }
    })
    console.log(tasks);
    tasks.forEach((ts) => {
      if (ts.name === name || ts.date === date) {
        return res.status(400).json({ status: 400, message: "Task already exist" });
      }
    });
    return res.status(200).json({ status:200,message: "Task Does not exist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: "Internal server error" });
  }
})

app.post("/api/ethurem/update-task", async (req, res) => {
  try {
    const { id , name , date } = req.body.date;
    console.log(date, name, id);
    const task = await contract.methods.viewTask(id).call();
    console.log(task)
    if(!task){
      return res.status(404).json({status: 404, message: "Task not exist"});    
    }
    if((task.name == name) || (task.id == id) || (task.date == date )){
      return res.status(200).json({status: 200, message: "Task Exist"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: "Internal server error" });
  }
})






app.listen(3001, () => {
  console.log("Server is running on port 3001");
})