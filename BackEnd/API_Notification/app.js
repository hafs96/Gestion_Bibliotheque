import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "amqplib";
import nodemailer from "nodemailer";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3000;
