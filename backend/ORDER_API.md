# Order API Documentation

## Overview
This document describes the Order API endpoints for the E-commerce backend system.

## Base URL
```
/orders
```

## Endpoints

### 1. Create Order
**POST** `/orders/create`

Creates a new order with the specified items and shipping details.

**Request Body:**
```json
{
  "userId": "uuid-string",
  "items": [
    {
      "productId": "uuid-string",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "city": "New York",
    "province": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "remarks": "Please deliver in the morning"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "uuid-string",
    "orderNumber": "ORD-1234567890-ABC123",
    "totalAmount": 99.98,
    "status": "pending",
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "credit_card",
    "remarks": "Please deliver in the morning",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2. Get User Orders
**GET** `/orders/user/:userId`

Retrieves all orders for a specific user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "orderNumber": "ORD-1234567890-ABC123",
      "totalAmount": 99.98,
      "status": "pending",
      "items": [...],
      "shippingAddress": {...},
      "paymentMethod": "credit_card",
      "remarks": "Please deliver in the morning",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {...}
    }
  ]
}
```

### 3. Get Order by ID
**GET** `/orders/:orderId`

Retrieves a specific order by its ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "orderNumber": "ORD-1234567890-ABC123",
    "totalAmount": 99.98,
    "status": "pending",
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "credit_card",
    "remarks": "Please deliver in the morning",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {...}
  }
}
```

### 4. Update Order Status
**PATCH** `/orders/:orderId/status`

Updates the status of an order (admin only).

**Request Body:**
```json
{
  "status": "processing"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `completed`
- `cancelled`
- `refunded`

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": "uuid-string",
    "status": "processing"
  }
}
```

### 5. Get All Orders
**GET** `/orders`

Retrieves all orders in the system (admin only).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "orderNumber": "ORD-1234567890-ABC123",
      "totalAmount": 99.98,
      "status": "pending",
      "items": [...],
      "shippingAddress": {...},
      "paymentMethod": "credit_card",
      "remarks": "Please deliver in the morning",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {...}
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields: userId, items, shippingAddress, paymentMethod"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Business Logic

### Order Creation Process
1. Validates required fields
2. Checks if user exists
3. Validates products and stock availability
4. Calculates total amount
5. Creates order and order items
6. Updates product stock
7. Returns order details

### Stock Management
- Stock is automatically deducted when an order is created
- Insufficient stock prevents order creation
- Stock validation happens before order creation

### Order Number Generation
- Unique order numbers are generated automatically
- Format: `ORD-{timestamp}-{randomString}`
- Ensures uniqueness across all orders

## Database Schema

### Orders Table
- `id`: UUID (Primary Key)
- `order_number`: VARCHAR(200)
- `total_amount`: NUMERIC(10,2)
- `status`: ENUM (pending, processing, completed, cancelled, refunded)
- `shipping_address`: JSON
- `payment_method`: VARCHAR(500)
- `remarks`: VARCHAR (nullable)
- `user_id`: UUID (Foreign Key)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP
- `deleted_at`: TIMESTAMP (nullable)

### Order Items Table
- `id`: UUID (Primary Key)
- `product_name`: VARCHAR(200)
- `quantity`: INT
- `price`: NUMERIC(10,2)
- `total_price`: NUMERIC(10,2)
- `order_id`: UUID (Foreign Key)
- `product_id`: UUID (Foreign Key)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP
