const chatDao = require('../daos/chat');

const createChat = async (req, res) => {
  const { userPrompt, aiResponse, conversationId } = req.body;
  const chat = await chatDao.createChat({ userPrompt, aiResponse, conversationId });
  return res.send({ chat });
};

const getChats = async (req, res) => {
  const searchParams = req.query;
  const chats = await chatDao.getChats(searchParams);
  return res.send({ chats });
};

const getChat = async (req, res) => {
  const { id } = req.params;
  const chat = await chatDao.getChat(id);
  return res.send({ chat });
};

const updateChat = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const chat = await chatDao.updateChat(id, updateInfo);
  return res.send({ chat });
};

const deleteChat = async (req, res) => {
  const { id } = req.params;
  await chatDao.deleteChat(id);
  return res.send({});
};

module.exports = { createChat, getChats, getChat, updateChat, deleteChat };
