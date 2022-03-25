import {AuthService} from "./auth.service";
import { io, Socket } from "socket.io-client";

export default class SocketsService {

  //private auth: AuthService = new AuthService();
  private connections: { [id: string] : Socket; } = {};
  private pendingConnections: { [id: string] : Socket; } = {};
  

  constructor(private socket: Socket, private auth: AuthService ){
    
    this.socket.on('connection', (event: Socket) => this.onConnection(event));
    //this.socket.on('disconnect', (event: Socket) => this.onDisconnect(event));
  }

  private async onConnection(socket: Socket){
    // set auth timeout and listen for auth event for token
    // pendingConnections dictionary will hold the socket until authenticated
    this.pendingConnections[socket.id] = socket;
    const authTimeout: number =10000; // process.env.SOCKET_ATUH_TIMEOUT ? Number(process.env.SOCKET_ATUH_TIMEOUT) : 15000;
    
    // decline after 15 sec
    setTimeout(() => {
      if(this.pendingConnections[socket.id]){
        console.log(`Force disconnect ${socket.id}`);
        this.pendingConnections[socket.id].disconnect();
        delete this.pendingConnections[socket.id];
      }
    },authTimeout)
    
    //listen for auth event
    socket.on('auth', (event: any) => this.onAuth(socket.id, event));
  }

  /**
   * Listen to client socket for message event
   */
  private listenToClientSocket(socket: Socket){
    this.connections[socket.id] = socket;
    this.connections[socket.id].on('message', (msg: any) => this.onMessage(socket.id, msg));
  }

  /**
   * auth message event handler
   * client is supposed to fire auth event with 'chat auth token' and 'user id'
   * listener with authenticate request and start listening to message
   */
  private async onAuth(socketId: string ,data: any){
    console.log('SocketIO onAuth', data);
    try{
      //await this.auth.validateChatToken(data.token, data.user, this.pendingConnections[socketId].conn.request.ip)
      this.listenToClientSocket(this.pendingConnections[socketId])
    }catch(e){
      this.pendingConnections[socketId].disconnect();
    }
    delete this.pendingConnections[socketId];
  }

  private onMessage(socketId: string, msg: any){
    console.log(`SocketIO onMessage ${socketId}`, msg);
  }

  private onDisconnect(socket: Socket){
    console.log('SocketIO onDisconnect', socket.id);
  }

}

